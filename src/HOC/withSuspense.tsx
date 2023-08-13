import React, { Suspense } from "react";

export const withSuspense = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<P> = () => <div>Loading...</div>
): React.ComponentType<P> => {
  return (props: P) => {
    return (
      <Suspense fallback={<FallbackComponent {...props} />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
};
