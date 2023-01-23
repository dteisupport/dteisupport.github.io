var lastScrollTop = 0;
var prevDirection;
$(window).scroll(function(e) {
  let grid = $(".content-grid")
    .css("grid-template-areas")
    .includes("leftcol cards");
  let em = $(".content-grid").offset().top;
  if (grid) {
    let windowHeight = $(window).height();
    let tipsHeight = $(".tips-box").outerHeight();
    let st = $(window).scrollTop();
    let tipsPos = $(".tips-box")[0].getBoundingClientRect();
    let tipsTop = tipsPos.top + 1;
    let tipsBot = tipsPos.bottom;
    if (tipsTop < em || tipsBot > windowHeight) {
      if (st > lastScrollTop && prevDirection != "down") {
        // downscroll code
        $(".tips-box").css("bottom", "initial");
        $(".tips-box").css("top", windowHeight - tipsHeight - em + "px");
        $(".tips-box").addClass("top");
        $(".tips-box").removeClass("bottom");
        prevDirection = "down";
        if (tipsTop >= em) {
          $("#tips-spacer").height(st);
        }
      } else if (st < lastScrollTop && prevDirection != "up") {
        // upscroll code
        let tipsPos = $(".tips-box")[0].getBoundingClientRect();
        let tipsTop = tipsPos.top + 1;
        $("#tips-spacer").height(st + tipsTop - em + "px");
        $(".tips-box").css("top", "initial");
        $(".tips-box").css("bottom", windowHeight - tipsHeight - em + "px");
        $(".tips-box").addClass("bottom");
        $(".tips-box").removeClass("top");
        prevDirection = "up";
      }
      lastScrollTop = st;
    } else {
      $("#tips-spacer").height(0);
      $(".tips-box").css("bottom", "initial");
      $(".tips-box").css("top", em + "px");
    }
  } else {
    $("#tips-spacer").height(0);
    $(".tips-box").css("bottom", "initial");
    $(".tips-box").css("top", em + "px");
  }
});

$(window).on("resize", function() {
  adjustTips();
});

// make sure this is copied properly to activty_btn_desktop
function adjustTips() {
  let grid = $(".content-grid")
    .css("grid-template-areas")
    .includes("leftcol cards");
  let em = $(".content-grid").offset().top;
  if (grid) {
    let windowHeight = $(window).height();
    let tipsHeight = $(".tips-box").outerHeight();
    if (tipsHeight + em > windowHeight) {
      if ($(".tips-box").hasClass("top")) {
        $(".tips-box").css("top", windowHeight - tipsHeight - em + "px");
      } else if ($(".tips-box").hasClass("bottom")) {
        $(".tips-box").css("bottom", windowHeight - tipsHeight - em + "px");
      }
    } else {
      $("#tips-spacer").height(0);
      $(".tips-box").css("bottom", "initial");
      $(".tips-box").css("top", em + "px");
    }
  } else {
    $("#tips-spacer").height(0);
    $(".tips-box").css("bottom", "initial");
    $(".tips-box").css("top", em + "px");
  }
}