---
layout: page
title: "URL Tokenizer for Twitter Direct Messages"
date: 2014-02-17 12:00
comments: false
sharing: true
footer: true
---
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
**If your URL looks similar to this: http://www.mysite.com/page, enter it here and click the 'tokenize' button. The result will appear in the bottom text box.**<br />
<input type="text" style="width: 300px" id="txtUrl" name="txtUrl" />&nbsp;&nbsp;<input type="button" id="btnTokenize" name="btnTokenize" value="tokenize" onclick="tokenize()" /><br />
<br />
**If your URL looks similar to this: http:||www\*mysite\*com|page, enter it here and click the 'detokenize' button. The result will appear in the top text box.**<br />
<input type="text" style="width: 300px" id="txtUrl2" name="txtUrl2" />&nbsp;&nbsp;<input type="button" id="btnDetokenize" name="btnDetokenize" value="detokenize" onclick="detokenize()"/><br />
<script type="text/javascript">
    function tokenize() {
        var url = $("#txtUrl").val();
        var newurl = url.replace(/\//g, "|");
        newurl = newurl.replace(/\./g, '*');;
        $("#txtUrl2").val(newurl);
        //alert(url);
    }

    function detokenize() {
        var url = $("#txtUrl2").val();
        var newurl = url.replace(/\|/g, "/");
        newurl = newurl.replace(/\*/g, ".");
        $("#txtUrl").val(newurl);
        //alert(url);
    }
</script>

This utility is provided as is to assist with sending URLs via Twitter direct message. It will replace the slash ('/') character with a pipe ('|') character and it will replace the dot ('.') character with an asterisk ('*'). This appears to enough to satisfy Twitter's direct message filter. In a [normal URL](http://tools.ietf.org/html/rfc3986), neither the pipe nor the asterisk should genrally appear in an unencoded form. You should, however, inspect your URL before using this utility. It is intended only to ease the sending of URLs via Twitter direct message and is not a URL shortener or a similar utility.