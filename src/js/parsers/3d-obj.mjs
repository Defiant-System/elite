
import { FS } from "./common.mjs";

(async () => {

	let input = "SHIP_CANISTER.txt";
	let output = "canister.obj";

	let src = await FS.readFile(`../cuts/${input}`);
	let lines = src.toString().split("\n");
	let data = {
			vertices: [],
			normals: [],
			faces: [],
		};
	
	lines.map(line => {
		let str, x, y, z, v1, v2, f1, f2, f3, f4, v;
		switch (true) {
			case line.startsWith(" VERTEX"):
				str = line.slice(7, line.lastIndexOf("\\")-1).trim();
				[x, y, z, f1, f2, f3, f4, v] = str.split(",").map(i => +i.trim());
				data.vertices.push([x, y, z]);
				break;
			case line.startsWith(" FACE"):
				str = line.slice(5, line.lastIndexOf("\\")-1).trim();
				[x, y, z, v] = str.split(",").map(i => +i.trim());
				data.normals.push([x, y, z]);
				break;
			case line.startsWith(" EDGE"):
				str = line.slice(5, line.lastIndexOf("\\")-1).trim();
				[v1, v2, f1, f2, v] = str.split(",").map(i => +i.trim());
				v1++;
				v2++;
				if (!data.faces[f1]) data.faces[f1] = [];
				if (!data.faces[f2]) data.faces[f2] = [];
				data.faces[f1].push([v1, v2]);
				data.faces[f2].push([v1, v2]);
				break;
		}
	});

	// data.faces = data.faces.slice(1,2);
	// console.log( data.faces );

	// make sure sorting is correct
	data.faces = data.faces.map(row => {
		let cell = row.shift(),
			sorted = [cell],
			next = cell[1];
		while (row.length) {
			let index = row.findIndex(a => a[0] === next);
			if (index > -1) {
				cell = row.splice(index, 1);
				sorted.push(...cell);
				next = cell[0][1];
			} else {
				index = row.findIndex(a => a[1] === next);
				cell = row.splice(index, 1);
				sorted.push([cell[0][1], cell[0][0]]);
				next = cell[0][0];
			}
		}
		return sorted;
	});
	// console.log( data.faces );

	// prepare output file
	let str = [];
	data.vertices.map(v => str.push(`v ${v.join(" ")}`));
	str.push("");
	data.normals.map(v => str.push(`vn ${v.join(" ")}`));
	str.push("");
	data.faces.map(r => str.push(`f ${r.map(c => c.join("/")).join(" ")}`));

	console.log( str.join("\n") );

})();
