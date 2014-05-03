TelegraphJS
========

A simple JavaScript example to demonstrate communicating state between the parent window and an iframe

TelegraphJS provides a convenient method to communicate, via callbacks,
between a parent window and windows contained in iframes by allowing
the caller to create events (messages) that are sent via postMessage
and associating these events with callbacks in the current window.
Typically you would include TelegraphJS in both the parent window
and the iframe though it will respond to any messages sent via postMessage.

TelegraphJS supports all the security features of postMessage allowing
you to specify the origin (URL) of the target and filter any received messages
by origin using a regular expression match for the URL of the sending
window.
