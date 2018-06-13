// Get supported HashOver backend queries from options (getbackendqueries.js)
HashOverConstructor.getBackendQueries = function (options)
{
	// URL queries array
	var queries = [];

	// Check if options parameter is an object
	if (options && options.constructor === Object) {
		// If so, use URL and title if available
		var url = options.url || this.getURL (options.canonical);
		var title = options.title || this.getTitle ();

		// And add thread to request if told to
		if (options.thread !== undefined) {
			queries.push ('thread=' + options.thread);
		}
	} else {
		// If not, get the URL and title from the page
		var url = this.getURL ();
		var title = this.getTitle ();
	}

	// Default backend request POST data
	queries.push ('url=' + encodeURIComponent (url));
	queries.push ('title=' + encodeURIComponent (title));

	return queries;
};
