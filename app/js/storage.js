(function(){

    var e_text = document.getElementById('enter');
    var b_enter = document.getElementById('b-enter');
    var b_delete = document.getElementById('b-delete');

    var addToLocalStorage = function(){
        localStorage.setItem('foo', e_text.value);
    };
    var removeFromLocalStorage = function(){
        localStorage.removeItem('foo');
    };

    var logStorage = function(evt){
        log('[LOCAL STORAGE] new: '+ evt.newValue + '; old: ' + evt.oldValue , (evt.newValue === null) ? 'error' : 'success');
    };


    b_enter.addEventListener('click', addToLocalStorage);
    b_delete.addEventListener('click', removeFromLocalStorage);

    window.addEventListener('storage', logStorage);

})();