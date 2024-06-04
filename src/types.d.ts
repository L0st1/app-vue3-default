export {}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: any;
  }
}