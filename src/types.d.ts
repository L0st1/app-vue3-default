export {}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: any;
  }
}
declare module "@ice/stark-data" {}
