import { useEffect, useRef } from "react";
import { EventEmitter } from "react-native";

// adpated from https://gist.github.com/sibelius/20659b4cd9be0ded32b53caa502e55fd

export const useEventEmitter = (
  eventEmitter: EventEmitter,
  eventName: string,
  fn
) => {
  const subscription = useRef(null);

  useEffect(() => {
    subscription.current = eventEmitter.addListener(eventName, fn);

    return () => {
      if (subscription.current) {
        subscription.current.removeAllListeners(eventName);
      }
    };
  }, [eventName]);
};
