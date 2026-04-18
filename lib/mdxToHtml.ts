/**
 * Lightweight Markdown→HTML converter.
 * No external ESM dependencies — runs safely in Next.js 14 server components.
 * Supports: headings, paragraphs, code blocks, inline code, bold, italic,
 * blockquote, ul, ol, tables, hr, links, images, line breaks.
 */

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Very small token-based language highlighter for common patterns */
function highlightCode(code: string, lang: string): string {
  const escaped = escHtml(code);

  const keywords: Record<string, string[]> = {
    csharp:    ["public","private","protected","static","async","await","class","interface","return","new","void","using","namespace","var","readonly","override","virtual","abstract","sealed","internal","partial","if","else","for","foreach","while","try","catch","throw","in","out","ref","bool","int","string","decimal","double","float","Task","IEnumerable","List","Dictionary"],
    cs:        ["public","private","protected","static","async","await","class","interface","return","new","void","using","namespace","var","readonly","override","virtual","if","else","for","foreach","while","try","catch","throw","bool","int","string","decimal","Task"],
    js:        ["const","let","var","function","return","if","else","for","while","class","async","await","import","export","default","new","typeof","instanceof","null","undefined","true","false","=>"],
    jsx:       ["const","let","var","function","return","if","else","for","while","class","async","await","import","export","default","new","typeof","null","undefined","true","false","=>"],
    ts:        ["const","let","var","function","return","if","else","for","while","class","async","await","import","export","default","new","typeof","null","undefined","true","false","=>","interface","type","extends","implements","readonly","public","private","protected","void","string","number","boolean"],
    tsx:       ["const","let","var","function","return","if","else","for","while","class","async","await","import","export","default","new","typeof","null","undefined","true","false","=>","interface","type","extends","implements"],
    sql:       ["SELECT","FROM","WHERE","JOIN","INNER","LEFT","RIGHT","ON","GROUP","BY","ORDER","HAVING","INSERT","INTO","VALUES","UPDATE","SET","DELETE","AND","OR","NOT","NULL","AS","COUNT","SUM","AVG","MAX","MIN","DISTINCT","TOP","BETWEEN","IN","LIKE","CASE","WHEN","THEN","END","WITH","CTE"],
    python:    ["def","class","return","if","else","elif","for","while","import","from","as","with","try","except","finally","raise","pass","break","continue","and","or","not","in","is","True","False","None","async","await","lambda","yield","global","nonlocal"],
  };

  const kws = keywords[lang.toLowerCase()] ?? keywords["js"];

  let result = escaped;

  // strings
  result = result.replace(
    /(&quot;|&#39;)(.*?)\1/g,
    (_m, q, s) => `<span style="color:#98c379">${q}${s}${q}</span>`
  );
  // comments
  result = result.replace(
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|--[^\n]*|#[^\n]*)/g,
    (m) => `<span style="color:#7f848e;font-style:italic">${m}</span>`
  );
  // numbers
  result = result.replace(
    /\b(\d+\.?\d*)\b/g,
    (m) => `<span style="color:#d19a66">${m}</span>`
  );
  // keywords
  if (kws) {
    const kwPattern = new RegExp(`\\b(${kws.join("|")})\\b`, "g");
    result = result.replace(
      kwPattern,
      (m) => `<span style="color:#c678dd">${m}</span>`
    );
  }

  return result;
}

function inlineFormat(text: string): string {
  return text
    // inline code
    .replace(/`([^`]+)`/g, (_, c) =>
      `<code style="font-family:monospace;color:#56b6c2;background:#0D1829;padding:2px 6px;border-radius:4px;font-size:0.875em;border:1px solid rgba(6,182,212,0.2)">${escHtml(c)}</code>`
    )
    // bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#F0F4FF;font-weight:600">$1</strong>')
    // italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, label, href) =>
        `<a href="${escHtml(href)}" style="color:#0EA5E9;text-decoration:underline" ${href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`
    );
}

function renderTable(rows: string[]): string {
  const [headerRow, , ...bodyRows] = rows;
  const headers = headerRow
    .split("|")
    .map((c) => c.trim())
    .filter(Boolean);

  const ths = headers
    .map(
      (h) =>
        `<th style="font-family:monospace;font-size:0.75rem;color:#0EA5E9;text-transform:uppercase;letter-spacing:0.05em;padding:10px 16px;text-align:left;border-bottom:1px solid rgba(14,165,233,0.15)">${h}</th>`
    )
    .join("");

  const trs = bodyRows
    .map((row) => {
      const cells = row
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      const tds = cells
        .map(
          (c) =>
            `<td style="color:#C8D4F0;padding:10px 16px;border-bottom:1px solid rgba(14,165,233,0.06)">${inlineFormat(c)}</td>`
        )
        .join("");
      return `<tr>${tds}</tr>`;
    })
    .join("");

  return `<div style="margin:1.5rem 0;overflow-x:auto;border-radius:12px;border:1px solid rgba(14,165,233,0.15)"><table style="width:100%;border-collapse:collapse;font-size:0.875rem"><thead style="background:#0A1628"><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

export function mdxToHtml(mdx: string): string {
  const lines = mdx.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      const code = codeLines.join("\n");
      const highlighted = highlightCode(code, lang);
      out.push(
        `<div style="margin:1.5rem 0;border-radius:12px;overflow:hidden;border:1px solid rgba(14,165,233,0.15)">` +
        `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:#0A1628;border-bottom:1px solid rgba(14,165,233,0.1)">` +
        `<div style="display:flex;gap:6px"><span style="width:10px;height:10px;border-radius:50%;background:#FF5F57;display:inline-block"></span><span style="width:10px;height:10px;border-radius:50%;background:#FEBC2E;display:inline-block"></span><span style="width:10px;height:10px;border-radius:50%;background:#28C840;display:inline-block"></span></div>` +
        `<span style="font-family:monospace;font-size:11px;color:#8B9EC0">${escHtml(lang)}</span>` +
        `</div>` +
        `<pre style="margin:0;padding:20px;background:#060d1a;overflow-x:auto;font-size:0.875rem;line-height:1.7;font-family:'JetBrains Mono',monospace"><code>${highlighted}</code></pre>` +
        `</div>`
      );
      i++;
      continue;
    }

    // table (detect by | in line)
    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableRows.push(lines[i]);
        i++;
      }
      out.push(renderTable(tableRows));
      continue;
    }

    // hr
    if (/^(---|\*\*\*|___)\s*$/.test(line)) {
      out.push(`<hr style="margin:2.5rem 0;border:0;height:1px;background:linear-gradient(90deg,transparent,rgba(14,165,233,0.3),transparent)" />`);
      i++;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.*)/);
    if (h) {
      const level = h[1].length;
      const text = inlineFormat(h[2]);
      const id = h[2].toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      const styles: Record<number, string> = {
        1: "font-size:1.875rem;border-left:3px solid #0EA5E9;padding-left:16px;margin-top:2.5rem;margin-bottom:1rem;color:#F0F4FF",
        2: "font-size:1.5rem;border-left:3px solid #0EA5E9;padding-left:16px;margin-top:2.5rem;margin-bottom:1rem;color:#F0F4FF",
        3: "font-size:1.25rem;border-left:2px solid #06B6D4;padding-left:12px;margin-top:2rem;margin-bottom:0.75rem;color:#F0F4FF",
        4: "font-size:1.125rem;margin-top:1.5rem;margin-bottom:0.5rem;color:#F0F4FF",
      };
      const s = styles[level] ?? styles[4];
      out.push(`<h${level} id="${id}" style="font-family:'Space Grotesk',sans-serif;font-weight:700;${s}">${text}</h${level}>`);
      i++;
      continue;
    }

    // blockquote
    if (line.startsWith("> ")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        bqLines.push(lines[i].slice(2));
        i++;
      }
      out.push(
        `<blockquote style="margin:1.5rem 0;padding:16px 20px;border-left:4px solid #0EA5E9;background:#0D1829;border-radius:0 8px 8px 0;color:#8B9EC0;font-style:italic">${bqLines.map(inlineFormat).join(" ")}</blockquote>`
      );
      continue;
    }

    // unordered list
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s/, "").trim());
        i++;
      }
      const lis = items
        .map(
          (item) =>
            `<li style="display:flex;gap:8px;align-items:flex-start;color:#C8D4F0;font-size:15px;line-height:1.7;margin-bottom:6px"><span style="margin-top:8px;flex-shrink:0;width:6px;height:6px;border-radius:50%;background:#0EA5E9;box-shadow:0 0 5px #0EA5E9;display:inline-block"></span><span>${inlineFormat(item)}</span></li>`
        )
        .join("");
      out.push(`<ul style="list-style:none;padding:0;margin:1rem 0">${lis}</ul>`);
      continue;
    }

    // ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, "").trim());
        i++;
      }
      const lis = items
        .map(
          (item, idx) =>
            `<li style="color:#C8D4F0;font-size:15px;line-height:1.7;margin-bottom:6px;padding-left:4px"><span style="color:#0EA5E9;font-weight:600;margin-right:8px">${idx + 1}.</span>${inlineFormat(item)}</li>`
        )
        .join("");
      out.push(`<ol style="list-style:none;padding:0;margin:1rem 0">${lis}</ol>`);
      continue;
    }

    // blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith("```") && !lines[i].startsWith(">") && !/^[-*+]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) && !/^(---|\*\*\*|___)\s*$/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      out.push(
        `<p style="color:#C8D4F0;line-height:1.85;margin-bottom:1.25rem;font-size:15px;font-family:'Inter',sans-serif">${inlineFormat(paraLines.join(" "))}</p>`
      );
    }
  }

  return out.join("\n");
}
