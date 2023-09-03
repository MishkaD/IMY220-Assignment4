 $(document).ready(function() 
{
    $('.submit').on('click', function() 
    {
      var message = $('#message').val().trim();
      
      if (message !== '') 
      {
        var messageDiv = $('<div class="message-div rounded mb-2"></div>');
        
        if ($(this).attr('id') === 'right') 
        {
          messageDiv.addClass('message-div-green');
        }
        
        // check is link=>youtube
        var YoutubeCheck= /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]+)/g;
        var YoutubeMatch = message.match(YoutubeCheck);
        
        if (YoutubeMatch) 
        {
          //loop for BONUS (more than one link)
          YoutubeMatch.forEach(function(youtubeMatch) 
          {
            //get ID
            var videoId = youtubeMatch.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]+)/)[1];
            //Create iframe
            var iframe = $('<iframe width="100%" height="315" frameborder="0" allowfullscreen></iframe>');
            iframe.attr('src', 'https://www.youtube.com/embed/' + videoId);
            //append
            messageDiv.append(iframe);
            var parts = message.split(youtubeMatch);
            //Better Format(text stays on the iframe)=>
            // Text before the link
            var textBefore = $('<div class="iframe-text"></div>');
            textBefore.text(parts[0]);
            messageDiv.append(textBefore);
  
            // Text after the link
            var textAfter = $('<div class="iframe-text"></div>');
            textAfter.text(parts[1]);
            messageDiv.append(textAfter);
          });
        } else 
        {
          // If no link 
          messageDiv.text(message);
        }
        
        $('.messages').prepend(messageDiv);
        $('#message').val('');
      }
    });
  });
  