import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "../../components";

// Define a type for route configurations
interface RouteConfig {
  path: string;
  element: React.ElementType; // React component type
}

const UnauthorizedRouter: React.FC = () => {
  const [routes, setRoutes] = useState<RouteConfig[]>([]);

  useEffect(() => {
    // Dynamically import subrouter files
    const loadRoutes = async () => {
      try {
        // Example of dynamic imports - replace with the paths to your subrouter files
        const routeModules = [
          import("./login/_subrouter"),
          import("./register/_subrouter"),
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
        <Layout.Login>
          <Routes>
            {routes?.map((r, i) => (
              <Route key={i} path={r.path} element={<r.element />} />
            ))}

            {/* Redirect to login if no matching route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout.Login>
      </Layout>
    </BrowserRouter>
  );
};

export default UnauthorizedRouter;
