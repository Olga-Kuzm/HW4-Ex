describe('Table sorting', function(){ 
    const idHeader = '//*[@class="tabulator-headers"]/*[@tabulator-field="id"]';
    const nameHeader = '//*[@class="tabulator-headers"]/*[@tabulator-field="name"]';
    const ageHeader = '//*[@class="tabulator-headers"]/*[@tabulator-field="age"]';
    
    const valuesID = '//*[@class="tabulator-cell"][@tabulator-field="id"]';
    const valuesName = '//*[@class="tabulator-cell"][@tabulator-field="name"]'; 
    const valuesAge = '//*[@class="tabulator-cell"][@tabulator-field="age"]';      
    
    before('log in', async function(){
        // await browser.maximizeWindow();
        await browser.url('https://viktor-silakov.github.io/course-sut/?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');        
        await $('button').click();
        await $('#spinner').waitForDisplayed({reverse:true})
    });
    
    context('sort by ID',  function(){
        it('should sort ID in ascending order', async function(){
            await $(idHeader).click();
            const attribute = await $(idHeader).getAttribute('aria-sort');        
            expect (attribute).toMatch('asc');                
            const arr = await $$(valuesID).map(async (elem) => {
                return await elem.getText()
            });             
            const asc = Object.assign([], arr).sort();            
            await expect(arr).toEqual(asc)
            
            
        });
        it('should sort ID in descending order', async function(){
            await $(idHeader).click();            
            const attribute = await $(idHeader).getAttribute('aria-sort');
            expect (attribute).toMatch('desc');
            const arr = await $$(valuesID).map(async (elem) => {
                return await elem.getText()
            });            
            const desc = Object.assign([], arr).sort().reverse()            
            await expect(arr).toEqual(desc)
        })             
        
    });
    context('sort by Name', function(){
        it('should sort Name in ascending order', async function(){
            await $(nameHeader).click();
            const attribute = await $(nameHeader).getAttribute('aria-sort')        
            expect (attribute).toMatch('asc'); 
            const arr = await $$(valuesName).map(async(elem)=>{
                return await elem.getText()
            })                        
            const asc = Object.assign([], arr).sort();                    
            expect(arr).toEqual(asc)
            
        })
        it('should sort Name in descending order', async function(){
            await $(nameHeader).click();
            const attribute = await $ (nameHeader).getAttribute('aria-sort');
            expect (attribute).toMatch('desc');
            const arr = await $$(valuesName).map((elem)=> {
                return elem.getText()
            })                       
            const desc = Object.assign([], arr).sort().reverse();                        
            expect (arr).toEqual(desc);
        })
    });
    context('sort by Age', function(){
        it('should sort Age in ascending order', async function(){
            await $(ageHeader).click();
            const attribute = await $(ageHeader).getAttribute('aria-sort');
            expect (attribute).toMatch('asc');
            const arr = await $$ (valuesAge).map((elem)=>{
                return elem.getText()
            });            
            const asc = Object.assign([], arr).sort((a,b)=> a>b); 
            console.log(asc)           
            expect (arr).toEqual(asc)
        });
        it('should sort Age in descending order', async function(){
            await $(ageHeader).click();
            const attribute = await $(ageHeader).getAttribute('aria-sort');
            expect (attribute).toMatch('desc');
            const arr = await $$(valuesAge).map((elem)=>{
                return elem.getText()
            });            
            const desc = Object.assign([], arr).sort((a,b)=>  b>a);   
            console.log(desc)      
            expect (arr).toEqual(desc)
        })
    })
})