export interface IBind {
	<R>(fn: () => R, obj: {}): () => R
	<P1, R>(fn: (p1: P1) => R, obj: {}): (p1: P1) => R
	<P1, P2, R>(fn: (p1: P1, p2: P2) => R, obj: {}): (p1: P1, p2: P2) => R
	<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, obj: {}): (p1: P1, p2: P2, p3: P3) => R
	<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}): (p1: P1, p2: P2, p3: P3, p4: P4) => R
	<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}): (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R
	<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}): (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}): (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}): (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}): (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R
	<P1, R>(fn: (p1: P1) => R, obj: {}, p1: P1): () => R
	<P1, P2, R>(fn: (p1: P1, p2: P2) => R, obj: {}, p1: P1): (p2: P2) => R
	<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, obj: {}, p1: P1): (p2: P2, p3: P3) => R
	<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4) => R
	<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5) => R
	<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1): (p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R
	<P1, P2, R>(fn: (p1: P1, p2: P2) => R, obj: {}, p1: P1, p2: P2): () => R
	<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, obj: {}, p1: P1, p2: P2): (p3: P3) => R
	<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4) => R
	<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5) => R
	<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6) => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2): (p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R
	<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, obj: {}, p1: P1, p2: P2, p3: P3): () => R
	<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4) => R
	<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5) => R
	<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6) => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6, p7: P7) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3): (p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R
	<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): () => R
	<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5) => R
	<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6) => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6, p7: P7) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6, p7: P7, p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4): (p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R
	<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): () => R
	<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6) => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6, p7: P7) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6, p7: P7, p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): (p6: P6, p7: P7, p8: P8, p9: P9) => R
	<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): () => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (p7: P7) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (p7: P7, p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): (p7: P7, p8: P8, p9: P9) => R
	<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): () => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): (p8: P8) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): (p8: P8, p9: P9) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): () => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): (p9: P9) => R
	<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, obj: {}, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9): () => R
}