import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "../../components";

// Define a type for route configurations
interface RouteConfig {
  path: string;
  element: React.ElementType;
}

const AuthorizedRouter: React.FC = () => {
  const [routes, setRoutes] = useState<RouteConfig[]>([]);

  useEffect(() => {
    // Dynamically import subrouter files
    const loadRoutes = async () => {
      try {
        const routeModules = [
          import("./dashboard/_subrouter"),
          import("./article/_subrouter"),
          import("./profile/_subrouter"),
        ];

        // Wait for all imports to resolve
        const modules = await Promise.all(routeModules);

        // Combine all routes from imported modules
        const allRoutes: RouteConfig[] = [];
        modules.forEach((module) => {
          allRoutes.push(...module.default); // Assuming each module exports an array of routes
        });

        setRoutes(allRoutes); // Set the loaded routes
      } catch (error) {
        console.error("Error loading routes:", error);
      }
    };

    loadRoutes();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Layout.Header />
        <Routes>
          {routes?.map((r, i) => (
            <Route key={i} path={r.path} element={<r.element />} />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AuthorizedRouter;
