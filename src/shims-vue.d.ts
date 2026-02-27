declare module "*.vue" {
    import type DefaultComponent from "vue";
    const component: DefaultComponent<{}, {}, any>;
    export default component;
}