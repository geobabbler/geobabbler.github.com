---
layout: blog
title: Working with .zig files
comments: true
post_author: bdollins
categories:
- gis
- open source
- ziggis
---

The last couple of days have shown some traffic being driven to my blog from search terms such as "opening zig file" so I thought I'd offer up a discussion of the format.

Abe Gillespie, the original developer of <a href="http://code.google.com/p/ziggis">zigGIS</a>, developed the zig file as a means of persisting PostGIS connection information used to access a layer and display it in ArcMap. He threw us a blast from the past by choosing the old Windows INI format as the zig file syntax. I admire the choice because, truth be told, I still use that format from time to time. For simple configuration information, it's more efficient than XML.<!--more-->

The INI is well documented but, as Win16 fades farther into history, it has become an anachronism. There is a reasonably good discussion of the format <a href="http://en.wikipedia.org/wiki/INI_file">here</a>.

I did a lot of work with INI files in VB6. There are about a half million VB6 implementations that wrap the Windows API to manage INI files. <a href="http://www.andreavb.com/tip080005.html">Here's one</a>. We use <a href="http://nini.sourceforge.net/">Nini</a> to manage the .zig files from within our .Net code.

Paolo's <a href="http://www.paolocorti.net/public/wordpress/index.php/2007/02/14/installing-ziggis-11-for-connecting-arcmap-to-postgis-layers/">latest post</a> about installing zigGIS 1.1 contains a description of the actual content of the .zig file.

If you wanted to programmatically access or change the .zig file, what would you do? First, you could download our source code and see how we use Nini to do it. Secondly, you could use the Windows API. The simplest class I have makes use of just two API calls:
<ul>
	<li>WritePrivateProfileStringA</li>
	<li>GetPrivateProfileString</li>
</ul>

Here's a good <a href="http://www.developer.com/net/vb/article.php/3287991">link</a> with some VB.NET source code.

The latst release Paolo posted makes zigGIS scriptable from within VBA. Therefore, those of you who will try it that way may find this code useful. It's an old VB6 class that I used to use but will work just fine in VBA:

{% codeblock lang:vbnet %}
Option Explicit
Private Declare Function WritePrivateProfileString _
    Lib "kernel32" Alias "WritePrivateProfileStringA" _
        (ByVal lpApplicationname As String, ByVal lpKeyName As Any, _
            ByVal lsString As Any, ByVal lplFilename As String) As Long
Private Declare Function GetPrivateProfileInt Lib _
    "kernel32" Alias "GetPriviteProfileIntA" (ByVal lpApplicationname As String, _
        ByVal lpKeyName As String, ByVal nDefault As Long, _
            ByVal lpFileName As String) As Long
Private Declare Function GetPrivateProfileString Lib "kernel32" Alias _
    "GetPrivateProfileStringA" (ByVal lpApplicationname As String, _
        ByVal lpKeyName As String, ByVal lpDefault As String, _
            ByVal lpReturnedString As String, ByVal nSize As Long, _
                ByVal lpFileName As String) As Long

Private m_strFile As String ' for file name
Private m_AppName As String '
Public Property Get FileName() As String
    FileName = m_strFile
End Property

Public Property Let FileName(ByVal strFile As String)
    m_strFile = Trim(strFile)
End Property

Private Sub Class_Initialize()
    m_strFile = ""
    m_AppName = ""
End Sub

Public Property Get ApplicationKey() As String
    ApplicationKey = m_AppName
End Property

Public Property Let ApplicationKey(ByVal strAppKey As String)
    m_AppName = Trim(strAppKey)
End Property
Private Function fConvert(str As String) As String
Dim i As Integer
Dim strOP As String
Dim intAsc As Integer

    str = Trim(str)
    
    strOP = ""
    
    For i = 1 To Len(str)
        intAsc = Asc(Mid(str, i, 1))
        If intAsc &gt; 31 And intAsc  0 Then
        GetValue = fConvert(strVal)
    Else
        GetValue = "Error"
    End If
End Function
Public Function SetValue(ByVal keyName As String, ByVal strValue As String) As Boolean
Dim ret As Long

ret = WritePrivateProfileString(m_AppName, keyName, strValue, m_strFile)
If ret = 0 Then
    SetValue = False
    Exit Function
End If
SetValue = True

End Function
{% endcodeblock %}

Hopefully, this will help or at least get you going in the right direction.