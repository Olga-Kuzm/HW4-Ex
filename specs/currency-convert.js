const dataBase = ('script#database');
const currensyInput = ('#sum-to-buy');
const output = ('#withdrew')
const testNum = '54321'

async function addAndWaitNumber(number){
    for(let i = 0; i < number.length; i++){
        await $(currensyInput).addValue(number[i])
        await browser.waitUntil(
            async()=>{
                const data = JSON.parse(await $(dataBase).getHTML(false));
                const nums = data.map((el)=>el.num)                
                 return nums.includes(number[i])
            }
        )
    }
}
function createExample(number){
    const arr = [];
    for(let i = 0; i<number.length; i++){
        arr.push({"num": number[i]})
    }
    return arr 
}

describe('Check convertion', function(){
    before('log', async function(){
        await browser.maximizeWindow();
        await browser.url('https://viktor-silakov.github.io/course-sut/?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');        
        await $('button').click();
        await $('#spinner').waitForDisplayed({reverse:true})
    })
    it('should enter numbers', async function(){
        await addAndWaitNumber(testNum); 
        const res = JSON.parse(await $(dataBase).getHTML(false));
        const example = createExample(testNum)
         await expect (res).toEqual(example)      
    });
    it('should count correct sum', async function(){
        await $('button[class="btn btn-primary"]').click();
        const result = await $(output).getText()        
        const rate = Number(await $('#currency-rate').getText())
        const count = testNum * rate;
        await expect(result).toMatch(`${testNum} => ${count}`)

    })
})