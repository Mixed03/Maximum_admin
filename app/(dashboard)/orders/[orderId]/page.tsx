import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColums";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const data = await res.json();

  if (!res.ok) {
    return <p>Failed to load order details</p>;
  }

  const { orderDetails, customer } = data;
  const { city, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div>
      <div className="px-10 py-5">
        <p className="text-heading2-bold">Order ID</p>
        <Separator className="bg-grey-1 my-4" />
      </div>
      <div className="flex flex-col py-4 px-10 gap-5">
        <p className="text-base-bold">
          Order ID: <span className="text-base-medium">{orderDetails._id}</span>
        </p>
        <p className="text-base-bold">
          Customer name:{" "}
          <span className="text-base-medium">{customer.name}</span>
        </p>
        <p className="text-base-bold">
          Customer Email:{" "}
          <span className="text-base-medium">{customer.email}</span>
        </p>
        <p className="text-base-bold">
          Shipping address:{" "}
          <span className="text-base-medium">
            {city}, {postalCode}, {country}
          </span>
        </p>
        <p className="text-base-bold">
          Total Paid:{" "}
          <span className="text-base-medium">${orderDetails.totalAmount}</span>
        </p>
        <p className="text-base-bold">
          Shipping rate ID:{" "}
          <span className="text-base-medium">{orderDetails.shippingRate}</span>
        </p>

        <div>
          <p className="text-base-bold">Payment status:</p>
          <div className="flex flex-wrap gap-4">
            {orderDetails.image && orderDetails.image.length > 0 ? (
              orderDetails.image.map((url: string, index: number) => (
                <div key={index} className="relative w-[240px] h-[427px]">
                  <Image
                    src={url}
                    alt={`uploaded-image-${index}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))
            ) : (
              <p className="text-base-medium">No images uploaded</p>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={orderDetails.products}
          searchKey="product"
        />
      </div>
    </div>
  );
};

export default OrderDetails;
