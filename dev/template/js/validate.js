var validate = (function(){

    function validate(input) {
        var inputParent = input.parent();
        var tooltip = inputParent.find('.error__tooltip');
        if(tooltip) {
            tooltip.remove();
        }
        if(input.val() == '') {
            input.addClass('input_error');
            insertTooltip('Пожалуйста, заполните форму', input);
        } else {
            input.removeClass('input_error');
        }
    }

    function clearForm(input) {
        var inputParent = input.parent();
        var tooltip = inputParent.find('.error__tooltip');
        if(tooltip) {
            tooltip.remove();
        }
        input.val('');
    }

    function insertTooltip(text, element) {
        element.after('<p class=\'error__tooltip\'>'+text+'</p>');
    }

    return {
        init: function(){
            var form = $('#reviews__form');
            var input = form.find('.reviews__form__input');
            
            var submitButton = form.find('#reviews__submit');
            var clearButton = form.find('#reviews__clear');
            
            submitButton.on('click', function(e){
                e.preventDefault();
                input.each(function(item){
                    validate($(this));
                })
            });

            clearButton.on('click', function(e){
                e.preventDefault();
                input.each(function(){
                    clearForm($(this));
                })
            })

        }
      };

})()

validate.init();