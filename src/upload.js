$(document).ready(function() {
    $('#result-success, #result-error').hide()

    var auth = window.location.hash.replace('#', '');

    $('#addAttachment').on('submit', function(event) {
        $('#result-success, #result-error').hide()

        var freightDocumentId = $('#freightDocumentId').val()

        var file = $('#file').prop('files')[0]
        var fr = new FileReader();
        fr.onload = function() {
            var request = {
                content: fr.result.split(',')[1],
                originalFileName: "upload.png",
                type: "GENERAL",
                sealed: "false"
            };

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
                $('#result-success').show();
            }).fail(function(jqXHR, textStatus) {
                var result = JSON.parse(jqXHR.responseText);

                $('#result-error div').html(jqXHR.responseText)
                $('#result-error').show()
            });
        }
        fr.readAsDataURL(file);

        event.preventDefault();
    });
});