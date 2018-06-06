(function() {    
    var view = {
        hideStatus: function() {
            $('#result-success, #result-error').hide();
        },

        init: function() {
            $(document).ready(function() {
                view.hideStatus();
                
                $('#addAttachment').on('submit', function(event) {
                    var file = $('#file').prop('files')[0];
                    var fr = new FileReader();
                    fr.onload = function() {
                        presenter.onSubmit($('#freightDocumentId').val(), fr.result.split(',')[1]);
                    };
                    fr.readAsDataURL(file);
                    
                    event.preventDefault();
                });
            });
        },
        
        showError: function(error) {
            $('#result-error div').html(error);
            $('#result-error').show();
        },
        
        showSuccess: function() {
            $('#result-success').show();
        }
    };
    view.init();

    var auth = window.location.hash.replace('#', '');
    var presenter = {
        onSubmit: function(freightDocumentId, content) {
            var request = {
                content: content,
                originalFileName: "upload.pdf",
                type: "GENERAL",
                sealed: "false"
            };

            view.hideStatus();
            
            $.ajax({
                type: "POST",
                url: TRANSFOLLOW_BASEURL + "/freightdocuments/" + freightDocumentId + "/attachments",
                accept: "application/json",
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + auth
                },
                data: JSON.stringify(request)
            }).done(function() {
                view.showSuccess();
            }).fail(function(jqXHR, textStatus) {                
                view.showError(jqXHR.responseText);
            });
        }
    };
})();