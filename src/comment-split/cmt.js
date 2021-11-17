function textToCmt(text) {
    let cmt ={}
    const air=/may lanh|dieu hoa/
    const led=/den|dien/
    const on=/bat|lam/
    const off=/tat/
    const up=/tang/
    const down=/giam/
    const hot=/nong|am/
    const cool=/lanh|mat/
    const tem=/\d\d do/

    if (air.test(text)){cmt.thietbi="air"}
    if (led.test(text)){cmt.thietbi="led"}
    if (on.test(text)){cmt.power="on"}
    if (off.test(text)){cmt.power="off"}
    if (up.test(text)){cmt.lenh="up"}
    if (down.test(text)){cmt.lenh="down"}
    if (hot.test(text)){
        cmt.hotcool="hot"
        cmt.thietbi="air"
    }
    if (cool.test(text)){
        cmt.hotcool="cool"
        cmt.thietbi="air"
    }
    if (tem.test(text)){
        cmt.tem=/ \d\d /.exec(text)[0]
        cmt.thietbi="air"
    }
    return cmt
}

console.log(textToCmt("bat dien"))