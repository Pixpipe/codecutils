const codecutils = require("..");

//************ TEST 1 ***********************************************
console.log("TEST 1");
const CodecUtils = codecutils.CodecUtils;

console.log("Is plaftform little endian: " + CodecUtils.isPlatformLittleEndian() );

var stringBefore = "I can has 🍔";
var strBuff = CodecUtils.unicodeToArrayBuffer( stringBefore );
var stringAfter = CodecUtils.arrayBufferToUnicode( strBuff )

if( stringBefore ===  stringAfter){
  console.log("unicode string to arraybuffer and back works");
}else{
  console.log("booh");
}

//*************** TEST 2 *******************************************
console.log("TEST 2 ");

var jack = {
  _data: [new Float32Array([512, 514, 516, 52000, 52010, 52011]), new Float32Array([12, 14, 16, 2000, 2010, 2011, 23])],
  _metadata: {
    firstname: "Jack",
    lastname: "Foo",
    date: new Date(),
    description: "this is the description of the Jack Foo block."
  }
}

var anArray = new Float32Array([12, 14, 16, 2000, 2010, 2011, 23])

var jack2 = {
  _data: {
    array1: new Float32Array([512, 514, 516, 52000, 52010, 52011]),
    array2: anArray
  },
  _metadata: {
    firstname: "Jack the 🍔",
    lastname: "Foo",
    date: new Date(),
    description: "this is the description of the Jack Foo block."
  }
}


var nbTypedArr = CodecUtils.howManyTypedArrayAttributes( jack );
console.log( nbTypedArr );


console.log("original Jack2");
console.log(jack2);

var hasCircRef = CodecUtils.hasCircularReference( jack2 )
console.log( "has circular ref: " + hasCircRef );

jack2._metadata.circ = jack2._metadata;
hasCircRef = CodecUtils.hasCircularReference( jack2 )
console.log( "has circular ref: " + hasCircRef );

var circRefFreeJack2 = CodecUtils.removeCircularReference( jack2 )
console.log(circRefFreeJack2);

var noTypedArrayJack2 = CodecUtils.replaceTypedArrayAttributesByArrays( jack2 );
console.log( noTypedArrayJack2 );

//*************** TEST 3 *******************************************
console.log("TEST 3");

// trying to serialize an object that contains typedArrays and circular dependencies
var jackBuff = CodecUtils.objectToArrayBuffer( jack2 );
var jackClone = CodecUtils.ArrayBufferToObject( jackBuff );
console.log( jackClone );
