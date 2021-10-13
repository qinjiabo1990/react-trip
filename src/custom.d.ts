// 所有是xxx.css的文件都符合如下定义
declare module "*.css" {
  const css: { [key:string]:string };
  export default css;
}