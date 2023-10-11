import { useState, useEffect } from "react";

export enum DeviceType {
  Computer = "computer",
  Tablet = "tablet",
  Mobile = "mobile",
}

const useDeviceType = (): DeviceType | null => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setDeviceType(DeviceType.Computer);
      } else if (screenWidth >= 768) {
        setDeviceType(DeviceType.Tablet);
      } else {
        setDeviceType(DeviceType.Mobile);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
