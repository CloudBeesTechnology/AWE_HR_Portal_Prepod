import React from "react";

// Reusable skeleton loader components
export const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-white rounded-lg shadow animate-pulse ${className}`}>
    <div className="h-4 bg-lite_grey rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-lite_grey rounded w-1/2"></div>
  </div>
);

export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="h-4 bg-lite_grey rounded animate-pulse"></div>
    ))}
  </div>
);

export const SkeletonCircle = ({ size = "w-12 h-12", className = "" }) => (
  <div className={`${size} rounded-full bg-lite_grey animate-pulse ${className}`}></div>
);

export const SkeletonRectangle = ({ className = "" }) => (
  <div className={`bg-lite_grey rounded animate-pulse ${className}`}></div>
);

// Dashboard specific skeleton loaders
export const DashboardCardSkeleton = () => (
  <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg shadow-lg animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-1 h-16 mr-4 border rounded-md bg-lite_grey border-BColor"></div>
        <div>
          <div className="w-12 h-8 bg-lite_grey rounded mb-2"></div>
          <div className="w-24 h-4 bg-lite_grey rounded"></div>
        </div>
      </div>
      <div className="w-12 h-12 bg-lite_grey rounded-full"></div>
    </div>
  </div>
);

export const NotificationSkeleton = () => (
  <div className="flex items-center px-4 py-6 gap-4 border-b border-BColor animate-pulse">
    <div className="flex flex-col justify-center items-center w-12 h-12 rounded-md bg-lite_grey"></div>
    <div className="flex flex-col flex-1">
      <div className="w-24 h-4 bg-lite_grey rounded mb-2"></div>
      <div className="w-full h-3 bg-lite_grey rounded"></div>
    </div>
  </div>
);

export const ApplicationCardSkeleton = () => (
  <div className="rounded-lg shadow-lg flex items-center border h-[120px] w-[150px] border-BColor animate-pulse">
    <div className="w-2 h-28 rounded-md bg-lite_grey"></div>
    <div className="w-full flex justify-center items-center flex-col m-1">
      <div className="w-20 h-4 bg-lite_grey rounded mb-2"></div>
      <div className="w-8 h-6 bg-lite_grey rounded"></div>
    </div>
  </div>
);