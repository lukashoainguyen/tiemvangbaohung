// Cập nhật bảng giá
$(function() {
  function validateUpdatePricingTable() {
    var generalCheck = true;
    $('input.update-input').each(function(index, el) {
      var inputValue = $(this).val();
      var pattern = /^[0-9]{0,3}\.[0-9]{3}\.[0-9]{3}$/g;
      var checkPattern = pattern.test(inputValue);
      if (checkPattern) {
        $(this).removeClass('wrong-value');
      } else {
        $(this).addClass('wrong-value');
        generalCheck = false;
      }
    });

    if (generalCheck === false) {
      $('.error-mess-fr').addClass('active');
      return false;
    } else {
      $('.error-mess-fr').removeClass('active');
      return true;
    }
  }

  function checkSameOldPrice() {
    var count = 0;
    $('input.update-input').each(function(index, el) {
      var inputValue = $(this).val();
      var oldValue = $(this).data('old-value');
      if (inputValue != oldValue) {
        count++;
      } else {
        $(this).addClass('warning-value');
      }
    });
    if (count == 0) {
      $('.error-mess-fr').addClass('active');
    } else {
      $('input.update-input').removeClass('warning-value');
    }
    return count;
  }

  $('button[data-update-pricing-table]').click(function(event) {
    if (validateUpdatePricingTable() && checkSameOldPrice() != 0) {
      $('#confirmUpdatePricing').modal();
    }
  });

  var socket = io.connect(myDomain);

  $('#updatePicingTableButton').click(function(event) {
    event.preventDefault();

    $.post(
      '/quan-ly/cap-nhat',
      {
        buy9999: $('input[name="buy9999"]').val(),
        sell9999: $('input[name="sell9999"]').val(),
        buy95_5: $('input[name="buy95_5"]').val(),
        sell95_5: $('input[name="sell95_5"]').val(),
        buy95: $('input[name="buy95"]').val(),
        sell95: $('input[name="sell95"]').val(),
        buy68: $('input[name="buy68"]').val(),
        sell68: $('input[name="sell68"]').val(),
        buy61: $('input[name="buy61"]').val(),
        sell61: $('input[name="sell61"]').val(),
        buy41_6: $('input[name="buy41_6"]').val(),
        sell41_6: $('input[name="sell41_6"]').val(),
        buy75_g: $('input[name="buy75_g"]').val(),
        sell75_g: $('input[name="sell75_g"]').val()
      }, function(data) {
        if (data == 'Update Successful!') {
          socket.emit('updateGoldPriceDone', {status: 'Successful'});
          window.location = '/quan-ly';
        }
    });
  });
});