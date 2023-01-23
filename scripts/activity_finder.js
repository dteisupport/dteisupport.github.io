function fastCollapse(prev) {
  let prevbp = $(prev).find(".best-practices");
  $(prevbp).css("max-height", "0px");
  $(prevbp).removeClass("active");
  $(prev).removeClass("active");
}

function scroll(self) {
  let em = $(".content-grid").offset().top
  const rect = $(self)[0].getBoundingClientRect().top;
  let topOfCard = $(self).offset().top
  let windowDistance = $(window).scrollTop();
  let windowHeight = $(window).height();
  let botOfWindow = windowDistance + windowHeight;
  let topOfPrevActiveCard = 0;

  let prev = $(".activity-card.active")[0]
  if (prev && prev != self) {
    topOfPrevActiveCard = $(prev).offset().top

    var elementBottom = topOfPrevActiveCard + $(prev).outerHeight();
    var viewportBottom = windowDistance + $(window).height();
    if (!(elementBottom > windowDistance && topOfPrevActiveCard < viewportBottom)) {
      topOfCard = $(self).offset().top
    }

    if (topOfPrevActiveCard < topOfCard) {
      topOfCard = topOfCard - 4;

      if (rect > 0) {
        let prevCardHeight = $(prev).height()
        let collapseDistance = $(prev).find(".best-practices").outerHeight(true)
        if (rect < collapseDistance) {
          fastCollapse(prev);
          let newCardHeight = $(prev).height()
          let collapse = windowDistance - (prevCardHeight - newCardHeight)
          $('html, body').scrollTop(collapse)
        }
      } else {
        fastCollapse(prev);
        topOfCard = $(self).offset().top
        $('html, body').scrollTop(topOfCard - em);
      }
    }
  }
  if (rect < 0) {
    $('html, body').animate({ scrollTop: topOfCard - em }, 250);
  }
  if (topOfCard > botOfWindow) {
    if (prev && prev != self) {
      fastCollapse(prev);
    }
    topOfCard = $(self).offset().top
    if (topOfPrevActiveCard < topOfCard && prev != self) {
      topOfCard = topOfCard - 4;
    }
    $('html, body').animate({ scrollTop: topOfCard - em }, 250);
  }
}

$(document).ready(function() {
  $("#course-logistics").parent().remove();
  $("#eoc-logistics").parent().remove();
  $(".actprops-text").each(function() {
    let val = $(this).html()
    let newval = propToStr(val)
    $(this).html(newval)
  })
})


$(".activity-card").on("click", function() {
  if (!($(this).hasClass("active"))) {

    let thisbp = $(this).find(".best-practices");
    $(thisbp).addClass("active");
    let bpHeight = $(thisbp).prop('scrollHeight');
    $(thisbp).css("max-height", bpHeight + 5 + "px");

    let self = $(this)
    scroll(self)

    let prevbp = $(".activity-card.active").find(".best-practices");
    $(prevbp).css("max-height", "0px");
    setTimeout(function() {
      $(prevbp).removeClass("active");
    }, 250)

    $(".activity-card").not(this).removeClass("active");
    $(this).addClass("active");
  }
})

$(window).resize(function() {
  let thisbp = $(".best-practices.active");
  let bpHeight = $(thisbp).prop('scrollHeight');
  $(thisbp).css("max-height", bpHeight + 5 + "px");
})

$(document).on("click", function(e) {
  let prev = $(".activity-card.active")[0]
  let isCard = false
  if (prev) {
    let focused = $(":focus")
    if ($(focused).parent().length == 1) {
      isCard = true
    }
    if ((!isCard && !($(e.target).is("button, a, input, label"))) || $(e.target).hasClass("close-card-button")) {
      $(prev).removeClass("active");
      let prevbp = $(prev).find(".best-practices");
      $(prevbp).css("max-height", "0px");
      setTimeout(function() {
        $(prevbp).removeClass("active");
      }, 250)
    }
  }
})

$(".clear-filters-button").not("#clear-all").on("click", function() {
  let section = $(this).parent().next(".filter-list")
  $(section).find('input:checkbox').removeAttr('checked');
  $(document).trigger(filterCards())
})

$("#clear-all").on("click", function() {
  $(".all-filters").find('input:checkbox').removeAttr('checked');
  $(document).trigger(filterCards())
})

$(".all-filters").find("input:checkbox").on("change", function() {
  $(document).trigger(filterCards())
})


