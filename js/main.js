$(document).ready(function () {
// Плагин кастомных селектов.
    $.fn.select = function () {
        this.each(function () {
            var items = "";
            var prompt = "";
            var selectValue = $(this).val();
            var self = this;
            $(this).find('option').each(function () {
                if( $(self).hasClass('select-valuted') ) {
                    var value = $(this).val() + ' ' + $(this).text();
                    if (value.length == 0) {
                        prompt = '<span class="select__prompt"><span>~</span> <strong>' + $(this).val() + '</strong> ' + $(this).text() + '</span>';
                    } else {
                        items += '<div class="select__item ' + (value == selectValue ? 'select__item--selected' : '') +
                            '" data-value="' + value + '"><span>~</span> <strong>' + $(this).val() + '</strong> ' + $(this).text() + '</div>';
                    }
                }
                else {
                    var value = $(this).val();
                    var text  = $(this).text();
                    if (value.length == 0) {
                        prompt = '<span class="select__prompt">' + $(this).text() + '</span>';
                    }
                    else {
                        items += '<div class="select__item ' + (value == selectValue ? 'select__item--selected' : '') +
                            '" data-value="' + value + '">' + $(this).text() + '</div>';
                    }
                }
            });
            if (selectValue.length > 0) {
                var $selected_option = $(this).find('option:selected');
                if( $(this).hasClass('select-valuted') ) {
                    var selected = '<span>~</span> <strong>' + $($selected_option).val() + '</strong> ' + $($selected_option).text();
                }
                else {
                    var selected = $($selected_option).text();
                }
            } else {
                var selected = prompt;
            }

            var selectClass = $(this).attr('class');
            if( $(this).hasClass('select-valuted') ) {
                var inputVal = '<input type="hidden" name="' + $(this).attr('name') + '" value="' + $(this).val() + ' ' + $(this).text() + '">';
            }
            else {
                var inputVal = '<input type="hidden" name="' + $(this).attr('name') + '" value="' + $(this).val() +'">';
            }
            var html =
                '<div class="select ' + selectClass + '">' + inputVal +
                '<div class="select__param">' + selected + '</div>' +
                '<div class="select__list">' + items + '</div>' +
                '</div>';

            $(this).replaceWith(html);
        });

        $(".select__list").hide();

        // По клику раскрывать выпадающий список.
        $('.select').click(function () {
            var $element = $(this);

            if($(this).hasClass("select--active")) {
                $($element).removeClass("select--active");
                $(this).find('.select__list').slideUp(200);
            }
            else {
                $($element).addClass("select--active");
                $(this).find('.select__list').slideDown(200);
            }
        });

        // Выбор элемента.
        $('.select__item').click(function () {
            $(this).parent().find('.select__item').removeClass('select__item--selected');
            $(this).addClass('select__item--selected');
            $(this).parent().slideUp(200);
            $(this).closest('.select').find('.select__param').html($(this).html());
            $(this).closest('.select').find('input').val($(this).data('value'));
        });
    };
    $('select').select();
});
