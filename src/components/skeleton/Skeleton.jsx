import React from 'react';

export const SkeletonBox = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`}></div>
);

export const HomeSkeleton = () => (
  <div className="w-full overflow-x-hidden">
    {/* Hero Skeleton */}
    <div className="h-screen bg-gray-200 animate-pulse"></div>

    {/* About Section Skeleton */}
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SkeletonBox className="h-12 w-64 mx-auto mb-12" />
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <SkeletonBox className="h-6 w-full" />
            <SkeletonBox className="h-6 w-full" />
            <SkeletonBox className="h-6 w-3/4" />
          </div>
          <SkeletonBox className="h-64 w-full" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBox key={i} className="h-48" />
          ))}
        </div>
      </div>
    </section>

    {/* Services Section Skeleton */}
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SkeletonBox className="h-12 w-64 mx-auto mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonBox key={i} className="h-64" />
          ))}
        </div>
      </div>
    </section>

    {/* Projects Section Skeleton */}
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SkeletonBox className="h-12 w-64 mx-auto mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <SkeletonBox key={i} className="h-96" />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export const ProjectSkeleton = () => (
  <div className="bg-white min-h-screen pt-24 pb-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <SkeletonBox className="h-12 w-96 mx-auto mb-4" />
        <SkeletonBox className="h-6 w-64 mx-auto" />
      </div>

      {/* Filter Skeleton */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonBox key={i} className="h-12 w-32" />
        ))}
      </div>

      {/* Project Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <SkeletonBox key={i} className="h-96" />
        ))}
      </div>
    </div>
  </div>
);

export const ContactSkeleton = () => (
  <div className="bg-black min-h-screen pt-24 pb-16">
    <div className="max-w-7xl mx-auto px-6">
      <SkeletonBox className="h-12 w-64 mx-auto mb-6 bg-gray-700" />
      <SkeletonBox className="h-6 w-96 mx-auto mb-12 bg-gray-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Form Skeleton */}
        <div className="space-y-5">
          <SkeletonBox className="h-10 w-48 mb-6 bg-gray-700" />
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBox key={i} className="h-12 w-full bg-gray-700" />
          ))}
          <SkeletonBox className="h-32 w-full bg-gray-700" />
          <SkeletonBox className="h-12 w-full bg-gray-700" />
        </div>

        {/* Contact Details Skeleton */}
        <div>
          <SkeletonBox className="h-10 w-48 mb-6 bg-gray-700" />
          <div className="space-y-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <SkeletonBox className="h-6 w-6 bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <SkeletonBox className="h-4 w-24 bg-gray-700" />
                  <SkeletonBox className="h-4 w-48 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
          <SkeletonBox className="h-64 w-full bg-gray-700" />
        </div>
      </div>
    </div>
  </div>
);
