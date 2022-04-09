const dataBase = ('script#database');
const currensyInput = ('#sum-to-buy');
const output = ('#withdrew')


async function addAndWaitNumber(number){
    await $(currensyInput).addValue(number); 
    await browser.waitUntil(
        async () => { 
            const data = JSON.parse(await $(dataBase).getHTML(false)); 
                if(number === data[number-1].num){
                    return true
                } 
        })
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
        
        await addAndWaitNumber("1");         
        await addAndWaitNumber("2");              
        await addAndWaitNumber("3");        
        await addAndWaitNumber("4");
              
        const res = JSON.parse(await $(dataBase).getHTML(false))        
        expect (res).toEqual([{ num: '1' }, { num: '2' }, { num: '3' }, { num: '4'}])
                
    });
    it('should count correct sum', async function(){
        await $('button[class="btn btn-primary"]').click();
        const result = await $(output).getText()        
        const rate = Number(await $('#currency-rate').getText())
        const count = 1234 * rate;
        await expect(result).toMatch(`1234 => ${count}`)

    })
})