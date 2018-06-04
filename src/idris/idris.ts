/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;
import ILanguage = monaco.languages.IMonarchLanguage;

export const conf: IRichLanguageConfiguration = {
	comments: {
		lineComment: '--'
	},
	brackets: [
	],
	autoClosingPairs: [
	],
	surroundingPairs: [
	],
};


export const language = <ILanguage>{
	defaultToken: '',
	ignoreCase: false,
	tokenPostfix: '.idr',

	keywords: [
		'module',
		'if', 'then', 'else', 'do', 'let', 'in', 'dsl',
		'impossible', 'case', 'of', 'total', 'partial', 'mutual', 'infix', 'infixl', 'infixr', 'constructor',
		'where', 'with', 'syntax', 'proof', 'postulate', 'using', 'namespace', 'rewrite',
		'public', 'private', 'export', 'implicit',
		'data', 'codata', 'class', 'instance', 'interface', 'implementation', 'record'
	  ],

	  typeKeywords: [
		'Type', 'Int', 'Nat', 'Integer',' Float', 'Char', 'String', 'Ptr', 'Bits8', 'Bits16', 'Bits32', 'Bits64', 'Bool'
	  ],

	  operators: [
		'=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
		'&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
		'<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
		'%=', '<<=', '>>=', '>>>='
	  ],

	  // we include these common regular expressions
	  symbols:  /[=><!~?:&|+\-*\/\^%]+/,

	  // C# style strings
	  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

	  // The main tokenizer for our languages
	  tokenizer: {
		root: [
		  // identifiers and keywords
		  [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',
									   '@keywords': 'keyword',
									   '@default': 'identifier' } }],
		  [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely

		  // whitespace
		  { include: '@whitespace' },

		  // delimiters and operators
		  [/[{}()\[\]]/, '@brackets'],
		  [/[<>](?!@symbols)/, '@brackets'],
		  [/@symbols/, { cases: { '@operators': 'operator',
								  '@default'  : '' } } ],

		  // @ annotations.
		  // As an example, we emit a debugging log message on these tokens.
		  // Note: message are supressed during the first load -- change some lines to see them.
		  [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],

		  // numbers
		  [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
		  [/0[xX][0-9a-fA-F]+/, 'number.hex'],
		  [/\d+/, 'number'],

		  // delimiter: after number because of .\d floats
		  [/[;,.]/, 'delimiter'],

		  // strings
		  [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
		  [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

		  // characters
		  [/'[^\\']'/, 'string'],
		  [/(')(@escapes)(')/, ['string','string.escape','string']],
		  [/'/, 'string.invalid']
		],

		comment: [
		  [/[--]+/,   'comment' ]

		],

		string: [
		  [/[^\\"]+/,  'string'],
		  [/@escapes/, 'string.escape'],
		  [/\\./,      'string.escape.invalid'],
		  [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
		],

		whitespace: [
		  [/[ \t\r\n]+/, 'white'],
		  [/--.*$/,    'comment'],
		],
	  },
};
