<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="chart-sidebar-head">
		<div class="cart-head">
			<div class="unicart-logo">
				<i class="icon-uni-cart-logo"></i>
				<h4>Universal</h4>
				<h3>Cartographics</h3>
			</div>
			<div class="game-date">
				<span>03:14</span>
				<span>20 Dec 3024</span>
			</div>
		</div>
	</xsl:template>

	<xsl:template name="chart-sidebar-star">
		<xsl:call-template name="chart-sidebar-head"/>
		<div class="cart-body">
			<h2><xsl:value-of select="../@name"/></h2>

			<div class="row">
				<span>Name</span>
				<span>
					<xsl:value-of select="@name"/>
				</span>
			</div>

			<xsl:if test="./Meta[@name='info']/@diameter">
				<div class="row">
					<span>Diameter</span>
					<span>
						<xsl:value-of select="format-number(./Meta[@name='info']/@diameter, '###,###,###')"/>
						<xsl:text> </xsl:text><i>km</i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@mass">
				<div class="row">
					<span>Mass</span>
					<span>
						<xsl:value-of select="substring-before(./Meta[@name='info']/@mass, '^')"/>
						<sup><xsl:value-of select="substring-after(./Meta[@name='info']/@mass, '^')"/></sup>
						<xsl:text> </xsl:text><i>kg</i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@gravity">
				<div class="row">
					<span>Gravity</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@gravity"/>
						<xsl:text> </xsl:text><i>m/s<sup>2</sup></i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@density">
				<div class="row">
					<span>Density</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@density"/>
						<xsl:text> </xsl:text><i>kg/m<sup>3</sup></i>
					</span>
				</div>
			</xsl:if>

			<!-- <div class="row">
				<span>Orbital Period</span>
				<span>1 Days</span>
			</div>
			<div class="row">
				<span>Semi Major Axis</span>
				<span>0.00 AU</span>
			</div>
			<div class="row">
				<span>Orbital Eccentricity</span>
				<span>0.0323</span>
			</div>
			<div class="row">
				<span>Orbital Inclintation</span>
				<span>1.40 deg</span>
			</div>
			<div class="row">
				<span>Arg Of Periapsis</span>
				<span>60.90 deg</span>
			</div>
			<div class="row">
				<span>Rotational Period</span>
				<span>1.0 Days</span>
			</div>
			<div class="row">
				<span>Axial Tilt</span>
				<span>0.00 Deg</span>
			</div> -->

			<h2>Summary</h2>
			<div class="summary">
				Industrial Economy.
			</div>
		</div>
	</xsl:template>

</xsl:stylesheet>