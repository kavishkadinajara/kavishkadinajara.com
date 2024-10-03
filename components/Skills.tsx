import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Avatar, Button, Badge, Input } from "@nextui-org/react";
import { motion } from "framer-motion"; // For animations

type Props = {};

export default function Skills({}: Props) {

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };
  const tabs = [
    {
      id: "pending-requests",
      label: "Request Suppliers",
      content: pendingSuppliers.map((supplier, index) => (
        <motion.div
          key={supplier.name}
          animate="visible"
          initial="hidden"
          transition={{ duration: 0.5, delay: index * 0.2 }}
          variants={fadeIn}
        >
          <Card className="mb-4 hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center">
              <Avatar alt={supplier.name} src={supplier.avatar} />
              <div className="ml-4">
                <h5>{supplier.name}</h5>
                <Badge className="mb-2" color="warning">
                  {supplier.status}
                </Badge>
                <p className="text-gray-500">
                  Requested: {supplier.requestDatetime}
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <Button
                className="hover:scale-105 transition-transform duration-300"
                color="primary"
                variant="shadow"
              >
                Approve
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      )),
    },
    {
      id: "current-suppliers",
      label: "Current Suppliers",
      content: (
        <div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              fullWidth
                  className="mb-4"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  isClearable
                //   bordered
                  label="Search by Name or Tea Number"
            />
          </motion.div>
          {filteredCurrentSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.name}
              animate="visible"
              initial="hidden"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={fadeIn}
            >
              <Card className="mb-4 hover:shadow-xl transition-shadow">
                <CardHeader className="flex items-center">
                  <Avatar alt={supplier.name} src={supplier.avatar} />
                  <div className="ml-4">
                    <h5>{supplier.name}</h5>
                    <p className="text-gray-500">
                      Tea Number: {supplier.teaNumber}
                    </p>
                    <Badge color="success">{supplier.status}</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <Button
                    className="hover:scale-105 transition-transform duration-300"
                    color="primary"
                    variant="shadow"
                  >
                    View Details
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col p-6 shadow-md rounded-lg ">
      <div>
        <h1 className="text-center text-xl md:text-3xl dark:text-gray-100 text-gray-900 font-bold">
          All Suppliers
        </h1>
      </div>
      <Tabs
        aria-label="Supplier tabs"
        color="primary"
        items={tabs}
        size="lg"
        variant="underlined"
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <div className="py-4">{item.content}</div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
