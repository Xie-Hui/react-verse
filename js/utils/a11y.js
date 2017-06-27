// Accessibility helpers
import React from 'react';

// FocusHandler is a component which adds focus to a given element each time the page renders. This ensures
// the keyboard focus is in a predictable location after page load.
class FocusHandler extends React.Component {
	componentDidUpdate( prevProps ) {
		const { routerProps, elementId } = this.props;
		const prevRouterProps = prevProps.routerProps;

		if ( routerProps.location === prevRouterProps.location ) {
			return;
		}

		const element = document.getElementById( elementId );
		element.focus();
	}

	render() {
		return this.props.children;
	}
}

/**
 * Create a router middleware, which wraps the `RouterContext` with the FocusHandler. FocusHandler in turn
 * sets focus on a specific element when a new page is rendered.
 *
 * @param  {string}  elementId  The element which should receive focus after render
 * @return {object}  An object with `renderRouterContext` defined, to be passed back to `applyRouterMiddleware`
 */
export function keyboardFocusReset( elementId ) {
	return {
		renderRouterContext: ( child, props ) => (
			<FocusHandler
				routerProps={ props }
				elementId={ elementId }
			>
				{ child }
			</FocusHandler>
		),
	};
};

/**
 * Toggle a `focus` class on navigation items as they're tabbed through.
 *
 * @param  {FocusEvent}  event  The blur or focus event on each link item.
 */
export function toggleFocus( event ) {
	var self = event.target;

	// Move up through the ancestors of the current link until we hit .main-navigation.
	while ( -1 === self.className.indexOf( 'main-navigation' ) ) {
		// On li elements toggle the class .focus.
		if ( 'li' === self.tagName.toLowerCase() ) {
			if ( -1 !== self.className.indexOf( 'focus' ) ) {
				self.className = self.className.replace( ' focus', '' );
			} else {
				self.className += ' focus';
			}
		}

		self = self.parentElement;
	}
}