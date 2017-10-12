async function fetchAndCompileWASM(wasmFileURL) {
    return new Promise((resolve, reject) => {
        return fetch(wasmFileURL)
            .then(response => {
                if (response.status === 200) {
                    return response.arrayBuffer();
                } else {
                    reject(response);
                }
            })
            .then(buffer => WebAssembly.compile(buffer))
            .then(module => {
                const imports = {
                    env: {
                        memoryBase: 0,
                        tableBase: 0,
                        memory: new WebAssembly.Memory({
                            initial: 256
                        }),
                        table: new WebAssembly.Table({
                            initial: 0,
                            element: 'anyfunc'
                        }),
                        _printf: print
                    }
                };
                let wasmInstance = new WebAssembly.Instance(module, imports);
                resolve(wasmInstance.exports);
            })
            .catch(e => reject({
                message: 'Something went wrong loading and compiling the given wasm module',
                details: e
            }));
    });
}

(async function () {
    try {
        let wasmModule = await fetchAndCompileWASM('calc.wasm');
        console.log("Sum 2 + 2 >>>", wasmModule._sum(2,2));
        console.log("Sub 8 - 2 >>>", wasmModule._sub(8,2));
        console.log("Mult 4 * 4 >>>", wasmModule._mult(4,4));
        console.log("Div 20 / 5 >>>", wasmModule._div(20,5));
    } catch (e) {
        console.error(e);
    }
})();