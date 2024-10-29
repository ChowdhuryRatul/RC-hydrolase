// this file resets the mouse event for 3d mol, only allow for rotate event
import * as ThreeDmol from "3dmol/build/3Dmol.js";
export const customMouseEvent = () => {
  // below solve zoom issue,
  // couple more issue left to solve
  // right click zoom
  // shift + mouse click (mouse 1, 2, 3 click)
  // mouse 3 drag
  ThreeDmol.GLViewer.prototype._handleMouseScroll = function (ev) {
    // console.log("Mouse Down event overridden for this instance!");
  };
  ThreeDmol.GLViewer.prototype._handleMouseMove = function (ev) {
    // touchmove

    clearTimeout(this.hoverTimeout);
    ev.preventDefault();

    let x = this.getX(ev);
    let y = this.getY(ev);
    if (x === undefined) return;

    let ratioX = this.renderer.getXRatio();
    let ratioY = this.renderer.getYRatio();

    let mouse = this.mouseXY(x, y);

    let self = this;
    // hover timeout
    if (this.current_hover !== null) {
      this.handleHoverContinue(mouse.x, mouse.y);
    }

    var mode = 0;
    if (!this.control_all && !this.isInViewer(x, y)) {
      return;
    }

    if (!this.scene) return;

    if (this.hoverables.length > 0) {
      this.hoverTimeout = setTimeout(function () {
        self.handleHoverSelection(mouse.x, mouse.y, ev);
      }, this.hoverDuration);
    }

    if (!this.isDragging) return;

    // Cancel longtouch timer to avoid invoking context menu if dragged away from start
    if (
      ev.targetTouches &&
      (ev.targetTouches.length > 1 ||
        (ev.targetTouches.length === 1 && !this.closeEnoughForClick(ev)))
    ) {
      clearTimeout(this.longTouchTimeout);
    }

    var dx = (x - this.mouseStartX) / this.WIDTH;
    var dy = (y - this.mouseStartY) / this.HEIGHT;
    // check for pinch
    if (
      this.touchDistanceStart != 0 &&
      ev.targetTouches &&
      ev.targetTouches.length == 2
    ) {
      var newdist = this.calcTouchDistance(ev);
      // change to zoom
      mode = 2;
      dy =
        ((newdist - this.touchDistanceStart) * 2) / (this.WIDTH + this.HEIGHT);
    } else if (ev.targetTouches && ev.targetTouches.length == 3) {
      // translate
      mode = 1;
    }

    dx *= ratioX;
    dy *= ratioY;
    var r = Math.hypot(dx, dy);
    if ((mode === 0 || this.mouseButton == 1) && r !== 0) {
      // Rotate
      var rs = Math.sin(r * Math.PI) / r;
      this.dq.x = Math.cos(r * Math.PI);
      this.dq.y = 0;
      this.dq.z = rs * dx;
      this.dq.w = -rs * dy;
      this.rotationGroup.quaternion.set(1, 0, 0, 0);
      this.rotationGroup.quaternion.multiply(this.dq);
      this.rotationGroup.quaternion.multiply(this.cq);
    }
    this.show();
  };
};

const getValue = (element) => {
  // console.log(element)
  return element
    ? element.value.constructor === Array
      ? element.value
          .filter((x) => x.type != "?")
          .map((x) => x.text)
          .join(", ")
      : element.value.text
    : null;
};

export const getPdbIdInfo = (cifData) => {
  if (
    !cifData ||
    Object.keys(cifData).length > 1 ||
    Object.keys(cifData).length == 0
  )
    return {};

  const key = Object.keys(cifData)[0];

  // Access parsed data
  return {
    doi: getValue(cifData[key]["_database_2.pdbx_DOI"]),

    classification: getValue(cifData[key]["_struct_keywords.pdbx_keywords"]),

    organisms: getValue(
      cifData[key]["_entity_src_gen.pdbx_gene_src_scientific_name"]
    ),

    expressionSystem: getValue(
      cifData[key]["_entity_src_gen.pdbx_host_org_scientific_name"]
    ),

    authors: getValue(cifData[key]["_audit_author.name"]),

    deposited: getValue(
      cifData[key]["_pdbx_database_status.recvd_initial_deposition_date"]
    ),

    released: getValue(
      cifData[key]["_pdbx_audit_revision_history.revision_date"]
    )
      ? getValue(
          cifData[key]["_pdbx_audit_revision_history.revision_date"]
        ).split(", ")[0]
      : null,
  };
};

// we use static array since we know what properties we have in pdbId
// might not be the best practice,
// property of pdbIdInfo can refer to function getPdbIdInfo in ./utils.jsx
export const pdbListItem = [
  {
    text: "PDB DOI",
    prop: "doi",
  },
  {
    text: "Classification(s)",
    prop: "classification",
  },
  {
    text: "Organism(s)",
    prop: "organisms",
  },
  {
    text: "Expression system",
    prop: "expressionSystem",
  },
  {
    text: "Author(s)",
    prop: "authors",
  },
  {
    text: "Deposit date",
    prop: "deposited",
  },
  {
    text: "Release date",
    prop: "released",
  },
];
