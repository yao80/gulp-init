export default class Hello {
  constructor(name){
    this.name = name;
  }
  say(){
    console.log("Hello, my name is " + this.name );
  }
}
