// Displays edit form (editcomment.js)
HashOver.prototype.editComment = function (comment)
{
	if (comment['editable'] !== true) {
		return false;
	}

	// Reference to this object
	var hashover = this;

	// Get permalink from comment JSON object
	var permalink = comment.permalink;

	// Get edit link element
	var link = this.elements.get ('edit-link-' + permalink, true);

	// Get file
	var file = this.permalinks.getFile (permalink);

	// Get name and website
	var name = comment.name || '';
	var website = comment.website || '';

	// Get and clean comment body
	var body = comment.body.replace (this.regex.links, '$1');

	// Create edit form element
	var form = this.elements.create ('form', {
		id: 'hashover-edit-' + permalink,
		className: 'hashover-edit-form',
		action: this.setup['http-backend'] + '/form-actions.php',
		method: 'post'
	});

	// Place edit form fields into form
	form.innerHTML = hashover.strings.parseTemplate (hashover.ui['edit-form'], {
		permalink: permalink,
		file: file,
		name: name,
		website: website,
		body: body
	});

	// Prevent input submission
	this.preventSubmit (form);

	// Add edit form to page
	var editForm = this.elements.get ('placeholder-edit-form-' + permalink, true);
	    editForm.appendChild (form);

	// Set status dropdown menu option to comment status
	this.elements.exists ('edit-status-' + permalink, function (status) {
		var statuses = [ 'approved', 'pending', 'deleted' ];

		if (comment.status !== undefined) {
			status.selectedIndex = statuses.indexOf (comment.status);
		}
	});

	// Blank out password field
	setTimeout (function () {
		if (form.password !== undefined) {
			form.password.value = '';
		}
	}, 100);

	// Uncheck subscribe checkbox if user isn't subscribed
	if (comment.subscribed !== true) {
		this.elements.get ('edit-subscribe-' + permalink, true).checked = null;
	}

	// Displays onClick confirmation dialog for comment deletion
	this.elements.get ('edit-delete-' + permalink, true).onclick = function ()
	{
		return confirm (hashover.locale['delete-comment']);
	};

	// Change "Edit" link to "Cancel" link
	this.cancelSwitcher ('edit', link, editForm, permalink);

	// Attach event listeners to "Save Edit" button
	var saveEdit = this.elements.get ('edit-post-' + permalink, true);

	// Get the element of comment being replied to
	var destination = this.elements.get (permalink, true);

	// Attach click event to formatting revealer hyperlink
	this.formattingOnclick ('edit', permalink);

	// Set onclick and onsubmit event handlers
	this.elements.duplicateProperties (saveEdit, [ 'onclick', 'onsubmit' ], function () {
		return hashover.postComment (destination, form, this, hashover.AJAXEdit, 'edit', permalink, link.onclick, false, true);
	});

	return false;
};
