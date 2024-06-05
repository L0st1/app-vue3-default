import { createGlobalState, useStorage } from "@vueuse/core";
import type { RemovableRef } from "@vueuse/shared";
import { unref } from "vue";

type State = {
  count: number | RemovableRef<number>;
  keyword: string | RemovableRef<string>;
};
// type ProtoType = keyof State;
type ProtoType = "count" | "keyword";
type RemovableRef2Value<T> = T extends RemovableRef<infer U> ? U : T;

/**
 * @link https://vueuse.org/shared/createGlobalState/
 * 使用localStorage进行持久化处理
 */
export const useGlobalState = createGlobalState(() => {
  const state: State = {
    count: useStorage("vueuse-local-storage-count", 0),
    keyword: useStorage("vueuse-local-storage-keyword", "KEY"),
  };

  const getter = (protoName: ProtoType) => {
    if (Reflect.has(state, protoName)) {
      return state[protoName] as RemovableRef<ProtoType>;
    } else {
      console.error(`全局状态不存在属性 ${protoName}`);
    }
  };

  const setter = (protoName: ProtoType, payload: RemovableRef2Value<State[typeof protoName]>) => {
    if (Reflect.has(state, protoName)) {
      if (typeof unref(state[protoName]) === typeof payload) {
        //@ts-expect-error
        state[protoName].value = payload;
      } else {
        console.error(`类型错误：payload的类型与${protoName}不匹配`);
      }
    } else {
      console.error(`全局状态不存在属性 ${protoName}`);
    }
  };

  return { getter, setter };
});
