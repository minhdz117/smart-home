function textToCmt(text) {
    let cmt ={}
    const air=/May lanh|dieu hoa/
    const led=/den|dien/
    const on=/bat|lam/
    const off=/tat/
    const sleep=/ngu/
    const up=/tang/
    const down=/giam/
    const heat=/nong|am/
    const cool=/lanh|mat/
    const tem=/ \d\d do/
    const powerfull=/chay toi da|lam lanh nhanh/

    if (air.test(text)){cmt.thietbi="air"}
    if (led.test(text)){cmt.thietbi="led"}
    if (on.test(text)){cmt.power="on"}
    if (off.test(text)){cmt.power="off"}
    if (sleep.test(text)){cmt.power="sleep"}
    if (powerfull.test(text)){cmt.power="powerfull"}
    if (up.test(text)){cmt.updown="up"}
    if (down.test(text)){cmt.updown="down"}
    if (heat.test(text)){
        cmt.hotcool="heat"
        cmt.thietbi="air"
    }
    if (cool.test(text)){
        cmt.hotcool="cool"
        cmt.thietbi="air"
    }
    if (tem.test(text)){
        cmt.tem=/\d\d/.exec(text)[0]
        cmt.thietbi="air"
    }
    console.log(cmt)
    return cmt
}
module.exports={textToCmt}
//console.log(textToCmt("bat dieu hoa nong"))