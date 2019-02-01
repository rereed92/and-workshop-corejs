// function speedOfLetters(input) {
//     let result = [];
//     for(var posInStr = 0; posInStr < input.length; posInStr++) {
//         const posInAlph = input.charCodeAt(posInStr) - 65;
//         const originalCharacter = input.charAt(posInStr);
//         result[posInAlph+posInStr] = originalCharacter
//     }
    
//     for(var i = 0; i < result.length; i++) {
//         if(!result[i]){
//             result[i] = " ";
//         }
//     }
//     return result.join('');
// }
function speedOfLetters(input) {
    let result = input.reduce((acc, originalCharacter) => {
    }, [])
    for(var posInStr = 0; posInStr < input.length; posInStr++) {
        const posInAlph = input.charCodeAt(posInStr) - 65;
        const originalCharacter = input.charAt(posInStr);
        result[posInAlph+posInStr] = originalCharacter
    }
    
    for(var i = 0; i < result.length; i++) {
        if(!result[i]){
            result[i] = " ";
        }
    }
    return result.join('');
}

test("Given a String of 'B' expect ' B' ", () => {
    expect(speedOfLetters("B")).toBe(" B");
});

test("Given a String of 'C' expect '  C' ", () => {
    expect(speedOfLetters("C")).toBe("  C");
});

test("Given a String of 'A' expect 'A' ", () => {
    expect(speedOfLetters("A")).toBe("A");
});

test("Given a String of 'AB' expect 'A B' ", () => {
    expect(speedOfLetters("AB")).toBe("A B");
});

test("Given a String of 'ABC' expect 'A B C' ", () => {
    expect(speedOfLetters("ABC")).toBe("A B C");
});

test("Given a String of 'ACE' expect 'A  C  E'", () => {
    expect(speedOfLetters("ACE")).toBe("A  C  E");
});

test("Given a string of 'CBA' expect '  A'", () => {
    expect(speedOfLetters("CBA")).toBe("  A");
});

test("Given a string of 'AZ' expect 'A                         Z'", () => {
    expect(speedOfLetters("AZ")).toBe("A                         Z");
});

test("Given a string of 'DZ' expect '   D                      Z'", () => {
    expect(speedOfLetters("DZ")).toBe("   D                      Z");
});

test("Given a string of 'HELLOWORLD' expect '     E H    DLL   OLO   R  W'", () => {
    expect(speedOfLetters("HELLOWORLD")).toBe("     E H    DLL   OLO   R  W");
});