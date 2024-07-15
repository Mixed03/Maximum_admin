"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/designs/DesignColumns";
import { DesignType } from "@/lib/types";

const Designs = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [designs, setDesigns] = useState<DesignType[]>([]);

  const getDesigns = async () => {
    try {
      const res = await fetch("/api/designs", {
        method: "GET",
      });
      const data = await res.json();
      setDesigns(data);
      setLoading(false);
    } catch (err) {
      console.log("[designs_GET]", err);
    }
  };

  useEffect(() => {
    getDesigns();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Designs</p>
        <Button
          className="bg-black text-white"
          onClick={() => router.push("/designs/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Design
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={designs} searchKey="title" />
    </div>
  );
};

export default Designs;
