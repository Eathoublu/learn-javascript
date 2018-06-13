<?php namespace HashOver;

// Copyright (C) 2018 Jacob Barkdull
// This file is part of HashOver.
//
// HashOver is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// HashOver is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with HashOver.  If not, see <http://www.gnu.org/licenses/>.


class Metadata
{
	public $setup;
	public $thread;
	public $data;

	public function __construct (Setup $setup, Thread $thread)
	{
		$this->setup = $setup;
		$this->thread = $thread;
		$this->data = $thread->data;
	}

	protected function prependLatestComments ($file, $global = false)
	{
		// Add thread to file if metadata is global
		if ($global === true) {
			$file = $this->setup->threadName . '/' . $file;
		}

		// Initial latest comments metadata array
		$latest = array ($file);

		// Attempt to read existing latest comments metadata
		$metadata = $this->data->readMeta ('latest-comments', 'auto', $global);

		// Check if latest comments metadata read successfully
		if ($metadata !== false) {
			// If so, merge existing comments with initial array
			$latest = array_merge ($latest, $metadata);
		}

		// Maximum number of latest comments to store
		$latest_max = max (10, $this->setup->latestMax);

		// Limit latest comments metadata array to configurable size
		$latest = array_slice ($latest, 0, $latest_max);

		// Attempt to save latest comments metadata
		$this->data->saveMeta ('latest-comments', $latest, 'auto', $global);
	}

	protected function spliceLatestComments ($file, $global = false)
	{
		// Add thread to file if metadata is global
		if ($global === true) {
			$file = $this->setup->threadName . '/' . $file;
		}

		// Attempt to read existing latest comments metadata
		$latest = $this->data->readMeta ('latest-comments', 'auto', $global);

		// Check if latest comments metadata read successfully
		if ($latest !== false) {
			$index = array_search ($file, $latest);

			// Check if the comment is in the latest array
			if ($index !== false) {
				// If so, remove it from the array
				array_splice ($latest, $index, 1);
			}

			// Attempt to save latest comments metadata
			$this->data->saveMeta ('latest-comments', $latest, 'auto', $global);
		}
	}

	public function addLatestComment ($file)
	{
		// Add comment to thread-specific latest comments metadata
		$this->prependLatestComments ($file);

		// Add comment to global latest comments metadata
		$this->prependLatestComments ($file, true);
	}

	public function removeFromLatest ($file)
	{
		// Add comment to thread-specific latest comments metadata
		$this->spliceLatestComments ($file);

		// Add comment to global latest comments metadata
		$this->spliceLatestComments ($file, true);
	}
}
