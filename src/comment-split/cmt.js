function textToCmt(text) {
    let cmt ={}
    const air=/máy lạnh|Điều hoà/
    const led=/Đèn|Điện/
    const on=/Bật|Làm/
    const off=/Tắt/
    const sleep=/Ngủ/
    const up=/Tăng/
    const down=/Giảm/
    const heat=/Nóng|Ấm/
    const cool=/Lạnh|Mát/
    const tem=/ \d\d Độ/
    const powerfull=/Chạy Tối Đa|Làm Lạnh Nhanh/

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