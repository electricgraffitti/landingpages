var Flash = {

  injectFlashBox: function() {
    $('#flash').addClass("flash_wrap");
    $("#flash").hide();
  },

  setFlash: function() {
    var flash_message = $("#flash").html();
    var msg = $.trim(flash_message);
    if (msg !== "") {
      Flash.activateNotice(flash_message);
    }
  },

  activateNotice: function(flash_message) {
    var flash_div = $("#flash");
    flash_div.html(flash_message);
    flash_div.show("slide", {
      direction: 'up'
    });
    // Set the fadeout
    setTimeout(function() {
      flash_div.hide("slide", {
        direction: 'up'
      },
      function() {
        flash_div.html("");
        flash_div.hide();
      });
    },
    2500);
  }
};

var Navigation = {

  setCurrentNav: function() {
    var url = location.pathname,
        all_links = $('ul.main_nav li'),
        current_link = $('ul.main_nav li a[href$="' + url + '"]'),
        active_link = current_link.parent("li");

    if (url == "/") {
      all_links.removeClass('active');
      $('.home').addClass('active');
    } else {
      all_links.removeClass('active');
      active_link.addClass('active');
    }
  }
};

var Layout = {

  setPanels: function() {
    Layout.setPanelSizes();
  },

  setPanelSizes: function() {
    var header = $("#mast_header"),
    		banner = $("#mast_banner"),
        footer = $("#mast_footer"),
        content = $("#mast_bd");

    content.height($(window).height() - (footer.outerHeight() + header.outerHeight() + banner.outerHeight()));

    $(window).resize(function() {
      content.height($(window).height() - (footer.outerHeight() + header.outerHeight() + banner.outerHeight()));
    });
  }
};

var App = {

  initialize: function () {
    Flash.injectFlashBox();
    Flash.setFlash();
    App.initDeleteLinks();
    // Layout.setPanels();
  },

  initDeleteLinks: function() {
    var deleteLinks = $(".delete_link");

    deleteLinks.on("click", function(e) {
      var self = $(this);
      
      Modal.confirmDelete("Are you sure? Deleting this record will not credit your account.", function() {
        App.deleteRecord(self);
      });
      e.preventDefault();
    });
  },

  deleteRecord: function(link) {
    var url = link.attr("href"),
        parent = link.parents(".delete_parent").first();

    $.ajax({
      url: url,
      type: "DELETE",
      success: function(response) {
        parent.remove();
        Modal.loadModal("Record deleted.");
      },
      error: function(response, text, message) {
        var errorMessage = text + " - " + message;
        Modal.loadModal(errorMessage);
      }
    }); 
  }
};

//**********Initialize Document**********//
$(document).ready(function() {
  App.initialize();
});
