const Products_increase = 1


const No_products = 0

const testNumber = 4;
test("returns truthy",()=>{
    expect(Products_increase).toBeTruthy()
})

it("when 0 value to be false", ()=>{
    expect(No_products).toBe(0)
})

