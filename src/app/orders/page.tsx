'use client';

import { useCallback, useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';

import Container from '@/components/Container';
import UserTabs from '@/components/user/UserTabs';
import axios, { AxiosResponse } from 'axios';
import Loader from '@/components/Loader';
import { Order } from '@prisma/client';
import { toast } from 'react-hot-toast';

const OrdersPage = () => {
  const [role, setRole] = useState(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatus, setOrderStatus] = useState<{ [orderId: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = useCallback(async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await axios.get('/api/profile').then((res: AxiosResponse) => {
        const userData = res.data;
        setRole(userData?.role);
        // setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get(`/api/orders?role=${role}`).then((res: AxiosResponse) => {
        setOrders(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [role]);

  const updateOrder = useCallback(
    async (id: string) => {
      const status = orderStatus[id];
      try {
        const updateOrderPromise = new Promise(async (resolve, reject) => {
          const res = await axios.put(`/api/orders/${id}`, { status });
          if (res.data) {
            resolve(res.data);
          } else {
            reject();
          }
        });

        toast.promise(updateOrderPromise, {
          loading: 'Updating order status...',
          success: 'Order status updated',
          error: 'Something went wrong!',
        });
        getOrders();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    [orderStatus, getOrders]
  );

  useEffect(() => {
    getCurrentUser();
    role && getOrders();
  }, [getOrders, getCurrentUser, role]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="mt-4 md:mt-8 max-w-6xl mx-auto flex flex-col items-center h-[70vh]">
        <UserTabs role={role} />
        <div className="w-full md:w-[80%] mt-4 md:mt-8 overflow-y-auto">
          {/* Map Orders */}
          {Array.isArray(orders) && orders.length > 0 && (
            <table className="bg-white border">
              <tr className="text-left">
                <th className="py-2 px-2 border-b border-r">s/n</th>
                <th
                  className={`py-2 px-2 border-b border-r ${
                    role !== 'VENDOR' && ' hidden'
                  }`}
                >
                  Reference
                </th>
                <th
                  className={`py-2 px-2 border-b border-r ${
                    role !== 'VENDOR' && ' hidden'
                  }`}
                >
                  Name
                </th>
                <th
                  className={`py-2 px-2 border-b border-r ${
                    role !== 'VENDOR' && ' hidden'
                  }`}
                >
                  Email
                </th>
                <th
                  className={`py-2 px-2 border-b border-r ${
                    role !== 'VENDOR' && ' hidden'
                  }`}
                >
                  Phone
                </th>
                <th
                  className={`py-2 px-2 border-b border-r ${
                    role !== 'VENDOR' && ' hidden'
                  }`}
                >
                  Address
                </th>
                <th className="py-2 px-2 border-b border-r">Products</th>
                <th className="py-2 px-2 border-b border-r">Amount(₦)</th>
                <th className="py-2 px-2 border-b border-r">Status</th>
              </tr>
              {orders.map((order: Order, idx: number) => (
                <tr
                  className={`text-sm ${
                    order.status === 'pending' && 'bg-red-50'
                  } ${order.status === 'delivered' && 'bg-green-100'} `}
                  key={order.id}
                >
                  <td className="py-2 px-2 border-b border-r">{idx + 1}</td>
                  <td
                    className={`py-2 px-2 border-b border-r ${
                      role !== 'VENDOR' && ' hidden'
                    }`}
                  >
                    {order.reference}
                  </td>
                  <td
                    className={`py-2 px-2 border-b border-r ${
                      role !== 'VENDOR' && ' hidden'
                    }`}
                  >
                    {order.name}
                  </td>
                  <td
                    className={`py-2 px-2 border-b border-r ${
                      role !== 'VENDOR' && ' hidden'
                    }`}
                  >
                    {order.email}
                  </td>
                  <td
                    className={`py-2 px-2 border-b border-r ${
                      role !== 'VENDOR' && ' hidden'
                    }`}
                  >
                    {order.phoneNumber}
                  </td>
                  <td
                    className={`py-2 px-2 border-b border-r ${
                      role !== 'VENDOR' && ' hidden'
                    }`}
                  >
                    {order.address}
                  </td>
                  <td className="py-2 px-2 border-b border-r">
                    {order?.cartProducts?.map((item) => (
                      <div key={(item as { id: string })?.id}>
                        <span>
                          {(item as { menuItemName: string })?.menuItemName}(
                          {(item as { quantity: number })?.quantity}), &nbsp;
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-2 border-b border-r">
                    {order.amount}
                  </td>
                  <td className="py-2 px-2 border-b border-r">
                    {role === 'VENDOR' ? (
                      <div className="flex gap-2 bg-white p-2 rounded-md">
                        <input
                          value={orderStatus[order.id] || order.status || ''}
                          onChange={(e: any) =>
                            setOrderStatus((prev) => ({
                              ...prev,
                              [order.id]: e.target.value,
                            }))
                          }
                          className="bg-transparent"
                        />
                        <CiEdit
                          size={20}
                          className="hover:cursor-pointer"
                          onClick={() => updateOrder(order.id)}
                        />
                      </div>
                    ) : (
                      order.status
                    )}
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
    </Container>
  );
};

export default OrdersPage;
