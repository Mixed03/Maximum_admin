"use client";

import Loader from '@/components/custom ui/Loader';
import DesignForm from '@/components/designs/DesignForm';
import React, { useEffect, useState } from 'react';

const DesignDetails = ({ params }: { params: { designId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [designDetails, setDesignDetails] = useState<DesignType | null>(null);

  const getDesignDetails = async () => {
    try {
      const res = await fetch(`/api/designs/${params.designId}`, {
        method: "GET",
      });
      const data = await res.json();
      setDesignDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[designId_GET]", err);
    }
  };

  useEffect(() => {
    getDesignDetails();
  }, []);

  return loading ? <Loader /> : <DesignForm initialData={designDetails} />;
};

export default DesignDetails;
