'use client';

import dynamic from 'next/dynamic';
import "swagger-ui-react/swagger-ui.css";

// Dynamically import SwaggerUI to ensure it only runs on the client
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { 
  ssr: false,
  loading: () => <p className="p-10">Loading API Documentation...</p>
});

export default function ApiDocs() {
  return (
    <div className="bg-white min-h-screen">
      <SwaggerUI spec={require("../../docs/openapi.json")} />
    </div>
  );
}