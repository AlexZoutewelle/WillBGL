/*
Main, the starting point
*/
var M4 = new Mat4();
console.log(M4);

var vec3 = new Vec3();
console.log(vec3);
var v = vec3.create(1,2,3);
vec3.normalize(v)
console.log(v);

var Pt4 = new Point4();
var p0 = Pt4.create(1,1,1,1);
var p1 = Pt4.create(3,3,3,3);

Pt4.normalize(p1);
console.log(p1);
