const global = Function('return this')() || (42, eval)('this');

export default global